import asyncio
from uuid import UUID

from construct import Array, Byte, Const, Int8sl, Int16ub, Struct
from construct.core import ConstError

from bleak import BleakScanner
from bleak.backends.device import BLEDevice
from bleak.backends.scanner import AdvertisementData

ibeacon_format = Struct(
    "type_length" / Const(b"\x02\x15"),
    "uuid" / Array(16, Byte),
    "major" / Int16ub,
    "minor" / Int16ub,
    "power" / Int8sl,
)

discoveredUUID = []
requiredUUID = 'FCE3C71B-5A0B-40C4-8728-C239FCE78A2B'

def device_found(
    device: BLEDevice, advertisement_data: AdvertisementData
):
    """Decode iBeacon."""
    try:
        apple_data = advertisement_data.manufacturer_data[0x004C]
        ibeacon = ibeacon_format.parse(apple_data)
        uuid = UUID(bytes=bytes(ibeacon.uuid))
        discoveredUUID.append(uuid)
    except KeyError:
        # Apple company ID (0x004c) not found
        pass
    except ConstError:
        # No iBeacon (type 0x02 and length 0x15)
        pass


async def main():
    """Scan for devices."""
    scanner = BleakScanner()
    scanner.register_detection_callback(device_found)

    while True:
        await scanner.start()
        await asyncio.sleep(1.0)
        await scanner.stop()


asyncio.run(main())