import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Register from "../components/Register";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn();

describe("Register Component", () => {
    beforeEach(() => {
        fetch.mockClear();
        mockNavigate.mockClear();
    });

    it("renders registration form correctly", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument();
    });

    it("registers a new user successfully", async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ message: "Registration successful!" }) });

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter Username"), { target: { value: "newuser" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "newuser@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "password123" } });

        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });
    it("navigates back to home when clicking the 'Back to Home' link", () => {
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/back to home/i));

        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
});
