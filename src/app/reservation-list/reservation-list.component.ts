import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { RoomTypeEnum } from '../models/room-type';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5;
  selectedReservation: Reservation | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  private loadReservations(): void {
    this.reservations = this.reservationService.getReservation();
    this.mapRoomTypeNames();
    this.filteredReservations = [...this.reservations];
  }

  private mapRoomTypeNames() {
    this.reservations = this.reservations.map((reservation) => ({
      ...reservation,
      roomType: RoomTypeEnum[reservation.roomTypeId]
    }));
  }

  searchReservations() {
    this.filteredReservations = this.reservations.filter(
      (reservation) =>
        reservation.guestName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.guestEmail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (reservation.roomType &&
          reservation.roomType.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        reservation.roomNumber.includes(this.searchQuery)
    );
    this.currentPage = 1;
  }

  get paginatedReservations(): Reservation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredReservations.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(newPage: number) {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(this.filteredReservations.length / this.itemsPerPage)
    ) {
      this.currentPage = newPage;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredReservations.length / this.itemsPerPage);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToNewReservation() {
    this.router.navigate(['/new']);
  }

  deleteReservation(reservationId: string) {
    this.reservationService.deleteReservation(reservationId);
  }

  openDeleteModal(reservation: Reservation) {
    this.selectedReservation = reservation;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.selectedReservation) {
      this.reservationService.deleteReservation(this.selectedReservation.id);
      this.toastr.success('Reservation deleted successfully!', 'Deleted');

      this.loadReservations();
    }
  }
}
