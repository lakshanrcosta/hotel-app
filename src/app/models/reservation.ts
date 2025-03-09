export interface Reservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  roomTypeId: number;
  roomType?: string;
  roomNumber: string;
}

export interface roomType {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomTypeId: number;
  isAvailable: boolean;
}
