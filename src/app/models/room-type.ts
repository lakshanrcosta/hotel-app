export enum RoomTypeEnum {
  Standard = 1,
  Deluxe = 2,
  Suite = 3
}

export const ROOM_TYPES = [
  { id: 1, name: 'Standard', price: 100, description: 'Basic room', imageUrl: '' },
  { id: 2, name: 'Deluxe', price: 150, description: 'Premium room with view', imageUrl: '' },
  { id: 3, name: 'Suite', price: 250, description: 'Luxury suite with balcony', imageUrl: '' }
];

export const ROOMS = [
  // Standard Rooms
  { id: '101', roomNumber: '101', roomTypeId: 1, isAvailable: true },
  { id: '102', roomNumber: '102', roomTypeId: 1, isAvailable: false },
  { id: '103', roomNumber: '103', roomTypeId: 1, isAvailable: true },
  { id: '104', roomNumber: '104', roomTypeId: 1, isAvailable: true },
  { id: '105', roomNumber: '105', roomTypeId: 1, isAvailable: false },

  // Deluxe Rooms
  { id: '201', roomNumber: '201', roomTypeId: 2, isAvailable: true },
  { id: '202', roomNumber: '202', roomTypeId: 2, isAvailable: false },
  { id: '203', roomNumber: '203', roomTypeId: 2, isAvailable: true },
  { id: '204', roomNumber: '204', roomTypeId: 2, isAvailable: false },
  { id: '205', roomNumber: '205', roomTypeId: 2, isAvailable: true },

  // Suite Rooms
  { id: '301', roomNumber: '301', roomTypeId: 3, isAvailable: true },
  { id: '302', roomNumber: '302', roomTypeId: 3, isAvailable: false },
  { id: '303', roomNumber: '303', roomTypeId: 3, isAvailable: true },
  { id: '304', roomNumber: '304', roomTypeId: 3, isAvailable: true },
  { id: '305', roomNumber: '305', roomTypeId: 3, isAvailable: false },

  // Additional Rooms
  { id: '401', roomNumber: '401', roomTypeId: 1, isAvailable: true },
  { id: '402', roomNumber: '402', roomTypeId: 1, isAvailable: false },
  { id: '403', roomNumber: '403', roomTypeId: 2, isAvailable: true },
  { id: '404', roomNumber: '404', roomTypeId: 2, isAvailable: false },
  { id: '405', roomNumber: '405', roomTypeId: 3, isAvailable: true },
  { id: '406', roomNumber: '406', roomTypeId: 3, isAvailable: false }
];
