import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ROOM_TYPES, ROOMS } from '../models/room-type';
import { Reservation, Room } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  roomTypes = ROOM_TYPES;
  allRooms: Room[] = ROOMS;
  availableRooms: Room[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group(
      {
        id: this.reservationService.generateReservationId(),
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
        guestName: ['', [Validators.required, Validators.minLength(3)]],
        guestEmail: ['', [Validators.required, Validators.email]],
        roomTypeId: ['', Validators.required],
        roomNumber: [{ value: '', disabled: true }, Validators.required]
      },
      { validators: this.dateValidator }
    );

    this.reservationForm.get('roomTypeId')?.valueChanges.subscribe((roomTypeId) => {
      this.updateAvailableRooms(parseInt(roomTypeId, 10));
    });

    this.reservationForm.get('checkInDate')?.valueChanges.subscribe(() => {
      this.reservationForm.get('checkOutDate')?.updateValueAndValidity();
    });
  }

  updateAvailableRooms(roomTypeId: number) {
    if (!roomTypeId) {
      this.availableRooms = [];
      this.reservationForm.get('roomNumber')?.disable();
      return;
    }

    this.availableRooms = this.allRooms.filter(
      (room: Room) => room.roomTypeId === roomTypeId && room.isAvailable === true
    );

    if (this.availableRooms.length > 0) {
      this.reservationForm.get('roomNumber')?.enable();
    } else {
      this.reservationForm.get('roomNumber')?.disable();
    }

    this.reservationForm.get('roomNumber')?.setValue('');
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const checkInDate = control.get('checkInDate')?.value;
    const checkOutDate = control.get('checkOutDate')?.value;

    if (checkInDate && checkOutDate && new Date(checkOutDate) < new Date(checkInDate)) {
      return { invalidDate: true };
    }
    return null;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.reservationForm?.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(reservation);
      this.toastr.success('Reservation created successfully!', 'Success');
      this.reservationForm.reset();
    } else {
      this.toastr.error('Please fill in all required fields', 'Error');
      this.reservationForm.markAllAsTouched();
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToReservations() {
    this.router.navigate(['/list']);
  }
}
