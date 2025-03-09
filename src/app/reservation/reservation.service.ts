import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    const reservations = localStorage.getItem('reservations');
    this.reservations = reservations ? JSON.parse(reservations) : [];
  }

  generateReservationId(): string {
    return uuidv4();
  }
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    this.saveToLocalStorage();
  }

  getReservation(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex((reservation) => reservation.id === id);
    this.reservations.splice(index, 1);
    this.saveToLocalStorage();
  }

  updateReservation(updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === updatedReservation.id
    );
    this.reservations[index] = updatedReservation;
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
