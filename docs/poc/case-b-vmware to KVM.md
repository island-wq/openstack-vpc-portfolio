---
title: Case B · VMware to KVM(OpenStack)
description: OpenStack 플랫폼 기능과 운영성 검증 PoC
---

# Case B · VMware 이미지 마이그레이션

## 목적

- OpenStack 기반 Private Cloud의 핵심 기능 확인
- Project 단위 자원 격리와 네트워크 정책 확인
- 외부 스토리지 연동과 가상자원 운영 기능 확인
- VMware 이미지의 KVM 기반 플랫폼 이전 절차 확인

## 검증 범위

- 시스템 구성과 OpenStack 서비스 상태
- Domain·Project·User·Group·Role 관리
- Network·Subnet·Port·Router 관리
- Flavor·Image·Instance 생명주기
- Security Group 생성·수정·적용
- Cinder Volume 연결·확장·해제
- Live/Cold Migration·Host Evacuation
- Snapshot·Backup·Restore
- VMDK→QCOW2 변환과 이미지 등록

## 구성 특징

- Controller·Compute 분리형 구성
- 외부 블록 스토리지 연동
- 서비스·관리·스토리지 트래픽 분리
- iSCSI Multipath 적용
- Tenant Overlay와 Provider Network 병행
- DVR 기반 분산 라우팅 적용

## 용량 검토

- Controller 배치 방식별 가용 vCPU·메모리 차이 확인
- 2노드 축소 구성의 수용 VM 수 비교
- 제어 기능 집중에 따른 장애 도메인 확대
- PoC 축소 구성과 상용 참조 구성의 분리 필요

## 마이그레이션 방법 상세

### 전체 절차

```mermaid
flowchart LR
  inspect["1. VMDK 점검"] --> convert["2. QCOW2 변환"]
  convert --> boot["3. SATA·IDE 임시 부팅"]
  boot --> driver["4. VirtIO Driver 적용"]
  driver --> switch["5. VirtIO 전환"]
  switch --> glance["6. Glance Image 등록"]
  glance --> verify["7. Instance 부팅 검증"]
```

### 1. 변환 환경 준비

- `virt-v2v`·`libguestfs-tools`·`qemu-utils` 설치
- Windows Guest용 `rhsrvany` 또는 대체 실행파일 준비
- UEFI Guest 대응용 `OVMF` Firmware 설치
- 원본 VMDK의 별도 보관 필요

```bash
sudo apt-get install -y \
  virt-v2v libguestfs-tools qemu-utils rpm2cpio ovmf
```

### 2. 원본 디스크 점검

- VMDK Format·가상 용량·실사용 용량 확인
- Partition·Filesystem·Boot 방식 확인
- EFI System Partition 존재 여부 확인
- BIOS·UEFI 유형에 따른 후속 절차 분리

```bash
qemu-img info source.vmdk
virt-filesystems --all --long -h -a source.vmdk
```

### 3. VMDK→QCOW2 변환

- `virt-v2v` 기반 Guest 최적화와 QCOW2 변환
- 변환 결과의 별도 출력 Directory 저장
- 변환 전후 Disk Size와 Partition 재확인

```bash
virt-v2v \
  -i disk source.vmdk \
  -o local \
  -os ./v2v-out \
  -of qcow2
```

### 4. Windows 임시 부팅

- 초기 System Disk의 SATA 또는 IDE Bus 연결
- 초기 Network Device의 `e1000` 적용
- VirtIO Driver ISO의 CD-ROM 연결
- BIOS Guest와 UEFI Guest의 Boot Option 분리

```bash
virt-install \
  --name migration-prep \
  --memory 4096 \
  --vcpus 2 \
  --import \
  --disk path=./v2v-out/system.qcow2,format=qcow2,bus=sata \
  --disk path=./virtio-win.iso,device=cdrom,readonly=on,format=raw \
  --network network=default,model=e1000 \
  --graphics vnc,listen=127.0.0.1 \
  --noautoconsole
```

- UEFI Guest의 `--boot uefi` 추가 적용
- VNC Listen Address의 관리망 제한 필요

### 5. VirtIO Driver 적용

- 임시 VirtIO Disk 연결을 통한 Driver 인식 유도
- Windows Guest Tools 또는 수동 INF 설치
- Storage Driver의 `BOOT_START` 설정 확인
- Driver 적용 전 System Disk의 VirtIO 직접 변경 금지

```bash
qemu-img create -f qcow2 ./virtio-probe.qcow2 1G

virsh attach-disk migration-prep \
  ./virtio-probe.qcow2 vdb \
  --driver qemu \
  --subdriver qcow2 \
  --targetbus virtio \
  --live \
  --persistent
```

```powershell
pnputil.exe -e
reg query HKLM\SYSTEM\CurrentControlSet\Services\viostor /v Start
```

- `viostor Start=0`의 `BOOT_START` 상태 확인
- Driver 미확인 시 `vioscsi`·`NetKVM` INF 수동 설치 필요
- Driver 적용 중 KVM Snapshot 생성 금지

### 6. Glance Image 등록

- BIOS·UEFI Firmware 속성 분리
- 실제 Boot Bus에 맞는 `hw_disk_bus` 지정
- Windows Guest의 `os_type=windows` 적용
- 원본 Disk 용량 기반 `min-disk` 설정 검토

```bash
openstack image create windows-migrated \
  --file ./system.qcow2 \
  --disk-format qcow2 \
  --container-format bare \
  --private

openstack image set windows-migrated \
  --property hw_disk_bus=sata \
  --property hw_firmware_type=bios \
  --property os_type=windows
```

- 공개 Image가 불필요한 경우 `--private` 적용
- UEFI Guest의 `hw_firmware_type=uefi` 적용

### 7. Instance 부팅 검증

- 변환 Image 기반 Instance 생성
- Console·System Disk·Network Interface 상태 확인
- Windows Device Manager의 VirtIO Storage·Network Driver 확인
- Reboot 후 Driver와 Boot 지속성 확인
- 기존 서비스 Port와 Application 기능 확인

```bash
openstack server create migration-test \
  --image windows-migrated \
  --flavor <FLAVOR_NAME_OR_ID> \
  --network <NETWORK_NAME_OR_ID>
```

### 주의사항

- 원본 VMDK의 직접 수정 금지
- BIOS·UEFI·Partition 유형의 사전 확인 필요
- Windows Version별 VirtIO Driver 호환성 확인 필요
- 임시 Disk·CD-ROM 제거 전 Driver 설치 확인 필요
- 실제 운영 전 License·정품 인증 정책 확인 필요
- 변환 성공과 Application 정상 동작의 별도 판정 필요
