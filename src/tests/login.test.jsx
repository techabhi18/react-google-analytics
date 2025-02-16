import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn();

describe("Login Component", () => {
    beforeEach(() => {
        fetch.mockClear();
        mockNavigate.mockClear();
    });

    it("renders login form correctly", () => {
        render(
            <MemoryRouter>
                <Login setUser={jest.fn()} />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Back to Home" })).toBeInTheDocument();
    });

    it("shows error message on failed login attempt", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: "Invalid username or password" }),
        });

        render(
            <MemoryRouter>
                <Login setUser={jest.fn()} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "wrongpassword" } });
        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument());
    });

    it("shows success message and redirects on successful login", async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

        const mockSetUser = jest.fn();
        render(
            <MemoryRouter>
                <Login setUser={mockSetUser} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "correctpassword" } });
        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith("test@example.com"));
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/welcome"));
    });

    it("navigates back to home when clicking the 'Back to Home' link", () => {
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/login" element={<Login setUser={jest.fn()} />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/back to home/i));

        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
});
