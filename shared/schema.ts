import { pgTable, text, serial, integer, boolean, date, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact Submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Appointment Requests
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  date: date("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  serviceType: text("service_type").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  name: true,
  email: true,
  phone: true,
  date: true,
  timeSlot: true,
  serviceType: true,
  description: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Group Dump Runs
export const groupDumpRuns = pgTable("group_dump_runs", {
  id: serial("id").primaryKey(),
  runDate: date("run_date").notNull(),
  capacity: integer("capacity").notNull().default(8),
  spotsRemaining: integer("spots_remaining").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGroupDumpRunSchema = createInsertSchema(groupDumpRuns).pick({
  runDate: true,
  capacity: true,
  spotsRemaining: true,
});

export type InsertGroupDumpRun = z.infer<typeof insertGroupDumpRunSchema>;
export type GroupDumpRun = typeof groupDumpRuns.$inferSelect;

// Group Dump Reservations
export const groupDumpReservations = pgTable("group_dump_reservations", {
  id: serial("id").primaryKey(),
  groupDumpRunId: integer("group_dump_run_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  loadSize: text("load_size").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGroupDumpReservationSchema = createInsertSchema(groupDumpReservations).pick({
  groupDumpRunId: true,
  name: true,
  email: true,
  phone: true,
  loadSize: true,
  notes: true,
});

export type InsertGroupDumpReservation = z.infer<typeof insertGroupDumpReservationSchema>;
export type GroupDumpReservation = typeof groupDumpReservations.$inferSelect;

// Custom quote requests
export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).pick({
  name: true,
  email: true,
  phone: true,
  description: true,
});

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
