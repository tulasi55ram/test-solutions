import React from "react";
import { render, waitFor, screen, waitForElementToBeRemoved, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import BookingsTable from "./BookingsTable"

import { fetchBookings, deleteBooking } from "../../services/booking/bookingService"

jest.mock("../../services/booking/bookingService", () => {
  return {
    fetchBookings: jest.fn(),
    deleteBooking: jest.fn()
  }
})


const fakeBookings = [{
  "id": "3bfccf95-7b19-4f3c-a21f-096eb51a8640",
  "parc": "7e86e1d4-7a05-4b83-ba83-c11354f21f09",
  "bookingdate": "2024-02-18T19:35:59.987Z",
  "comments": "A ipsum est ut libero soluta in aliquid a.",
  "user": "17cc669f-0e01-4685-b5d4-3b575244fe0f"
}, {
  "bookingdate": "2023-10-19T16:21:55.853Z",
  "comments": "Occaecati dicta harum enim sint.",
  "id": "35df5b36-4fb1-4ab7-8857-6f02454a8d22",
  "parc": "9ef73b32-5f6c-4f7d-9b16-2d716171fb95",
  "user": "2d7cdcf8-0ae8-4eb6-9303-bb1715268789"
}]


describe("BookingsTable", () => {

  beforeEach(() => {
    global.fetch = jest.fn()
    jest.clearAllMocks()
  })

  it("Should render bookingTableLoader before fetching data", () => {
    const { getByTestId } = render(<BookingsTable />)
    expect(getByTestId("bookingTableLoader")).toBeInTheDocument()
  })

  it("Should render bookingTable Header with empty data ", async () => {
    (fetchBookings as jest.Mock).mockImplementation(() => Promise.resolve({ data: [] }))

    const { getByTestId } = render(<BookingsTable />)
    await waitFor(() => {
      expect(fetchBookings).toHaveBeenCalledTimes(1)
    })
    await waitForElementToBeRemoved(()=> getByTestId("bookingTableLoader"))
    expect(screen.getByText("ID")).toBeInTheDocument()
    expect(screen.getByText("User ID")).toBeInTheDocument()
    expect(screen.getByText("Date")).toBeInTheDocument()
    expect(screen.getByText("Actions")).toBeInTheDocument()
  })

  it("Should render bookingTable with data", async () => {
    (fetchBookings as jest.Mock).mockImplementation(() => Promise.resolve({ data: fakeBookings }))

    const { getByTestId } = render(<BookingsTable />)
    await waitFor(() => {
      expect(fetchBookings).toHaveBeenCalledTimes(1)
    })
    await waitForElementToBeRemoved(()=> getByTestId("bookingTableLoader"))
    fakeBookings.forEach(booking => {
      expect(screen.getByText(booking.id)).toBeInTheDocument()
      expect(screen.getByText(booking.user)).toBeInTheDocument()
      expect(screen.getByText(booking.bookingdate)).toBeInTheDocument()
    })

  })

  it("Should show error message when fetchBookings fails", async () => {
    (fetchBookings as jest.Mock).mockImplementation(() => Promise.reject(new Error("Failed to fetch bookings")));

    const { getByTestId, getByText } = render(<BookingsTable />)

    await waitFor(() => {
      expect(fetchBookings).toHaveBeenCalledTimes(1)
    })
    await waitForElementToBeRemoved(()=> getByTestId("bookingTableLoader"))

    expect(getByText("Failed to fetch bookings")).toBeInTheDocument()
  })

  it("Should delete booking and render remaining bookings", async () => {
    (fetchBookings as jest.Mock).mockImplementation(() => Promise.resolve({ data: fakeBookings }));
    (deleteBooking as jest.Mock).mockImplementation(() => Promise.resolve({ data: [] }));

    const { getByTestId, getByText, findByText } = render(<BookingsTable />)
    await waitFor(() => {
      expect(fetchBookings).toHaveBeenCalledTimes(1)
    })
    await waitForElementToBeRemoved(()=> getByTestId("bookingTableLoader"))

    const tBodyElement = getByTestId("bookingTableBody")
    expect(tBodyElement.children).toHaveLength(2)
    const deleteButton = tBodyElement.children[0].querySelector("button") as HTMLButtonElement
    userEvent.click(deleteButton)
    await waitFor(() => {
      expect(deleteBooking).toHaveBeenCalledTimes(1)
    })
    await findByText("Deleted booking successfully")
    expect(getByText(fakeBookings[1].user)).toBeInTheDocument()
    expect(deleteBooking).toHaveBeenCalledTimes(1)
    expect(tBodyElement.children).toHaveLength(1)
  })

  it("Should show error message when deleteBooking fails", async () => {
    (fetchBookings as jest.Mock).mockImplementation(() => Promise.resolve({ data: fakeBookings }));
    (deleteBooking as jest.Mock).mockImplementation(() => Promise.reject(new Error("Failed to delete booking")));

    const { getByTestId, findByText } = render(<BookingsTable />)
    await waitFor(() => {
      expect(fetchBookings).toHaveBeenCalledTimes(1)
    })
    await waitForElementToBeRemoved(()=> getByTestId("bookingTableLoader"))

    const tBodyElement = getByTestId("bookingTableBody")
    expect(tBodyElement.children).toHaveLength(2)
    const deleteButton = tBodyElement.children[0].querySelector("button") as HTMLButtonElement
    userEvent.click(deleteButton)
    await waitFor(() => {
      expect(deleteBooking).toHaveBeenCalledTimes(1)
    })
    await findByText("Failed to delete booking")
    expect(deleteBooking).toHaveBeenCalledTimes(1)
    expect(tBodyElement.children).toHaveLength(2)
  })

})