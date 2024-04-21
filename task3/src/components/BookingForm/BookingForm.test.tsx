import React from "react"
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BookingForm from "./BookingForm"
import { createBooking } from "../../services/booking/bookingService";

jest.mock("../../services/booking/bookingService", () => {
  return {
    createBooking: jest.fn()
  }
})

const mockOnBookingCreated = jest.fn()

const renderBookingForm = (): RenderResult => render(<BookingForm onBookingCreated={mockOnBookingCreated} />)

describe("BookingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("Should render all TextFields and submit button", () => {
    const { getByLabelText, getByTestId } = renderBookingForm()
    expect(getByLabelText("Name")).toBeInTheDocument()
    expect(getByLabelText("Date")).toBeInTheDocument()
    expect(getByTestId("addBookingButton")).toBeInTheDocument()
  })

  it("Should update name and date when input is changed", () => {
    const { getByLabelText } = renderBookingForm()
    const nameInput = getByLabelText("Name")
    const dateInput = getByLabelText("Date")
    userEvent.type(nameInput, "Test Name")
    userEvent.type(dateInput, "2022-12-12")
    expect(nameInput).toHaveValue("Test Name")
    expect(dateInput).toHaveValue("2022-12-12")
  })

  it("Should call onBookingCreated when form is submitted", async () => {
    (createBooking as jest.Mock).mockImplementation(() => Promise.resolve({ data: [] }))
    
    const { getByLabelText, getByTestId, findByText } = renderBookingForm()
    const nameInput = getByLabelText("Name")
    const dateInput = getByLabelText("Date")
    userEvent.type(nameInput, "Test Name")
    userEvent.type(dateInput, "2022-12-12")
    expect(nameInput).toHaveValue("Test Name")
    expect(dateInput).toHaveValue("2022-12-12")
    userEvent.click(getByTestId("addBookingButton"))
    await findByText("Add Booking")
    expect(mockOnBookingCreated).toHaveBeenCalled()
  })

  it("Should show error message when createBooking fails", async () => {
    (createBooking as jest.Mock).mockImplementation(() => Promise.reject(new Error("Failed to create booking")))
    
    const { getByLabelText, getByTestId, findByText } = renderBookingForm()
    const nameInput = getByLabelText("Name")
    const dateInput = getByLabelText("Date")
    userEvent.type(nameInput, "Test Name")
    userEvent.type(dateInput, "2022-12-12")
    expect(nameInput).toHaveValue("Test Name")
    expect(dateInput).toHaveValue("2022-12-12")
    userEvent.click(getByTestId("addBookingButton"))
    await findByText("Add Booking")
    await findByText("Failed to create booking")
  })

})