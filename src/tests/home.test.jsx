import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/Home";

describe("Homepage", () => {
    it("redirects to registration page when 'Register' link is clicked", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Home />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText(/register/i));
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    it("redirects to login page when 'Login' link is clicked", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Home />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText(/login/i));
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });
});
