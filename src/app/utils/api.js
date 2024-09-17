import axios from "axios";
import { error } from "console";

const API_URL = 'http://localhost:3001/api';

export const createPassenger = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/passenger`, data);
        return response.data;
    } catch (err) {
        console.error("Error creating passenger:", err);
        throw error;
    }
};


export const createDriver = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/driver`, data);
        return response.data;
    } catch (err) {
        console.error("Error creating driver:", err);
        throw error;
    }
}

export const createTaxiOwner = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/taxiowner`, data);
        return response.data;
    } catch (err) {
        console.error("Error creating Taxi Boss:", err);
        throw error;
    }
}

export const createTaxi = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/taxi`, data);
        return response.data;
    } catch (err) {
        console.error("Error creating a new taxi:", err);
        throw error;
    }
}

export const createRoute = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/route`, data);
        return response.data;
    } catch (err) {
        console.error("Error creating route:", err);
        throw error;
    }
}

export const createTrip = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/trip`, data);
        return response.data;
    } catch (err) {
        console.error("Error creating trip:", err);
        throw error;
    }
}

