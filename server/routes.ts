import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertAppointmentSchema, 
  insertGroupDumpReservationSchema,
  insertQuoteRequestSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for handling form submissions
  const apiRouter = express.Router();
  
  // Error handler helper
  const handleZodError = (err: unknown) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return validationError.message;
    }
    return String(err);
  };

  // Get all group dump runs
  apiRouter.get("/group-dump-runs", async (req, res) => {
    try {
      const runs = await storage.getGroupDumpRuns();
      res.json(runs);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch group dump runs" });
    }
  });

  // Contact form submission
  apiRouter.post("/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contactData);
      res.status(201).json({ 
        message: "Contact form submitted successfully", 
        contact: newContact 
      });
    } catch (err) {
      res.status(400).json({ 
        error: "Invalid contact form data", 
        details: handleZodError(err) 
      });
    }
  });

  // Appointment booking
  apiRouter.post("/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const newAppointment = await storage.createAppointment(appointmentData);
      res.status(201).json({ 
        message: "Appointment booked successfully", 
        appointment: newAppointment 
      });
    } catch (err) {
      res.status(400).json({ 
        error: "Invalid appointment data", 
        details: handleZodError(err) 
      });
    }
  });

  // Group dump run reservation
  apiRouter.post("/group-dump-reservations", async (req, res) => {
    try {
      const reservationData = insertGroupDumpReservationSchema.parse(req.body);
      
      // Check if run exists and has spots available
      const run = await storage.getGroupDumpRunById(reservationData.groupDumpRunId);
      if (!run) {
        return res.status(404).json({ error: "Group dump run not found" });
      }
      
      if (run.spotsRemaining <= 0) {
        return res.status(400).json({ error: "No spots remaining for this group dump run" });
      }
      
      const newReservation = await storage.createGroupDumpReservation(reservationData);
      res.status(201).json({ 
        message: "Reservation created successfully", 
        reservation: newReservation 
      });
    } catch (err) {
      res.status(400).json({ 
        error: "Invalid reservation data", 
        details: handleZodError(err) 
      });
    }
  });

  // Custom quote requests
  apiRouter.post("/quote-requests", async (req, res) => {
    try {
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      const newQuoteRequest = await storage.createQuoteRequest(quoteData);
      res.status(201).json({ 
        message: "Quote request submitted successfully", 
        quoteRequest: newQuoteRequest 
      });
    } catch (err) {
      res.status(400).json({ 
        error: "Invalid quote request data", 
        details: handleZodError(err) 
      });
    }
  });

  // Mount the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
