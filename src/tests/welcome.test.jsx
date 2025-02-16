import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Welcome Component", () => {
    it("logs out the user and redirects to login", async () => {
        const mockSetUser = jest.fn();
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        localStorage.setItem("user", "testuser");

        render(
            <MemoryRouter>
                <Welcome user="testuser" setUser={mockSetUser} />
            </MemoryRouter>
        );

        expect(screen.getByText("Welcome, testuser!")).toBeInTheDocument();

        fireEvent.click(screen.getByText("LOGOUT"));

        await waitFor(() => {
            expect(mockSetUser).toHaveBeenCalledWith(null);
            expect(localStorage.getItem("user")).toBeNull();
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });
});
