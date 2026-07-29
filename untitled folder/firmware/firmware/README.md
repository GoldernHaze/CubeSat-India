# CubeSat Packet Pipeline — Firmware

Payload fragmentation, queuing, NGHam encapsulation, and telemetry monitoring
for occultation event data, implemented as four FreeRTOS tasks. Developed
during a Summer Internship at SpaceLab (UFSC).

## Overview

The pipeline reads occultation payload data, splits it into fixed-size
chunks, forwards them through a FIFO queue manager, encodes each chunk into
an NGHam packet, and reports live telemetry (queue occupancy, generation/
transmission rates, overflow counts).

Currently runs on the FreeRTOS POSIX/Linux simulator for development and
testing before porting to the MSP430 target hardware.

## Pipeline Tasks

1. **Task 1 — Payload Reader / Fragmenter**: reads occultation event data,
   splits into 32-byte chunks, pushes into Queue 1.
2. **Task 2 — FIFO Queue Manager**: drains Queue 1, forwards to Queue 2,
   preserving order.
3. **Task 3 — NGHam Encoder**: drains Queue 2, encodes each chunk into an
   NGHam frame (CRC16 + Reed-Solomon FEC + framing).
4. **Task 4 — Telemetry Monitor**: samples queue occupancy and reports
   generation/transmission rates once per second.

## Directory Structure
firmware/
├── app/structs/ - Payload chunk and telemetry data type definitions
├── config/ - FreeRTOSConfig.h
├── drivers/ngham/ - NGHam packet encoder
├── freertos/ - FreeRTOS kernel + POSIX simulator port
├── main.c - Entry point, task creation
└── Makefile

## Dependencies

- GCC
- POSIX threads (`pthread`)
- FreeRTOS kernel (bundled under `freertos/`)

## Build & Run

```bash
make clean && make
./build/telemetry_pipeline
```

Or in one step:

```bash
make run
```

## Status

In development — currently validated on the POSIX simulator. MSP430 target
port pending.

## License

GNU General Public License v3.0 — see `LICENSE`.

## Contributors

- Hardik Singhal
- Shivansh Gupta
- Amrit Mishra

Mentor: Lucas Ryan