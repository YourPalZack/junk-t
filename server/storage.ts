import { 
  users, 
  type User, 
  type InsertUser,
  contacts,
  type Contact,
  type InsertContact,
  appointments,
  type Appointment,
  type InsertAppointment,
  groupDumpRuns,
  type GroupDumpRun,
  type InsertGroupDumpRun,
  groupDumpReservations,
  type GroupDumpReservation,
  type InsertGroupDumpReservation,
  quoteRequests,
  type QuoteRequest,
  type InsertQuoteRequest
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;

  // Group Dump Runs
  createGroupDumpRun(run: InsertGroupDumpRun): Promise<GroupDumpRun>;
  getGroupDumpRuns(): Promise<GroupDumpRun[]>;
  getGroupDumpRunById(id: number): Promise<GroupDumpRun | undefined>;
  updateGroupDumpRunSpots(id: number, spotsRemaining: number): Promise<GroupDumpRun | undefined>;

  // Group Dump Reservations
  createGroupDumpReservation(reservation: InsertGroupDumpReservation): Promise<GroupDumpReservation>;
  getGroupDumpReservations(): Promise<GroupDumpReservation[]>;
  getGroupDumpReservationsByRunId(runId: number): Promise<GroupDumpReservation[]>;

  // Quote Requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private appointments: Map<number, Appointment>;
  private groupDumpRuns: Map<number, GroupDumpRun>;
  private groupDumpReservations: Map<number, GroupDumpReservation>;
  private quoteRequests: Map<number, QuoteRequest>;
  
  private userIdCounter: number;
  private contactIdCounter: number;
  private appointmentIdCounter: number;
  private groupDumpRunIdCounter: number;
  private groupDumpReservationIdCounter: number;
  private quoteRequestIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.appointments = new Map();
    this.groupDumpRuns = new Map();
    this.groupDumpReservations = new Map();
    this.quoteRequests = new Map();
    
    this.userIdCounter = 1;
    this.contactIdCounter = 1;
    this.appointmentIdCounter = 1;
    this.groupDumpRunIdCounter = 1;
    this.groupDumpReservationIdCounter = 1;
    this.quoteRequestIdCounter = 1;
    
    // Initialize with some sample group dump runs for June 2023
    this.initializeGroupDumpRuns();
  }

  // Initialize with some group dump runs
  private initializeGroupDumpRuns() {
    const juneDates = [6, 14, 20, 28]; // June 2023 dates from the design
    
    juneDates.forEach(day => {
      const date = new Date(2023, 5, day); // June is month 5 (0-indexed)
      this.createGroupDumpRun({
        runDate: date,
        capacity: 8,
        spotsRemaining: 8
      });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Appointments
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentIdCounter++;
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      createdAt: new Date()
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  // Group Dump Runs
  async createGroupDumpRun(insertRun: InsertGroupDumpRun): Promise<GroupDumpRun> {
    const id = this.groupDumpRunIdCounter++;
    const run: GroupDumpRun = { 
      ...insertRun, 
      id, 
      createdAt: new Date()
    };
    this.groupDumpRuns.set(id, run);
    return run;
  }

  async getGroupDumpRuns(): Promise<GroupDumpRun[]> {
    return Array.from(this.groupDumpRuns.values())
      .sort((a, b) => {
        return new Date(a.runDate).getTime() - new Date(b.runDate).getTime();
      });
  }

  async getGroupDumpRunById(id: number): Promise<GroupDumpRun | undefined> {
    return this.groupDumpRuns.get(id);
  }

  async updateGroupDumpRunSpots(id: number, spotsRemaining: number): Promise<GroupDumpRun | undefined> {
    const run = this.groupDumpRuns.get(id);
    if (!run) return undefined;
    
    const updatedRun: GroupDumpRun = { ...run, spotsRemaining };
    this.groupDumpRuns.set(id, updatedRun);
    return updatedRun;
  }

  // Group Dump Reservations
  async createGroupDumpReservation(insertReservation: InsertGroupDumpReservation): Promise<GroupDumpReservation> {
    const id = this.groupDumpReservationIdCounter++;
    const reservation: GroupDumpReservation = { 
      ...insertReservation, 
      id, 
      createdAt: new Date()
    };
    this.groupDumpReservations.set(id, reservation);
    
    // Decrease spots remaining in the group dump run
    const run = await this.getGroupDumpRunById(insertReservation.groupDumpRunId);
    if (run && run.spotsRemaining > 0) {
      await this.updateGroupDumpRunSpots(run.id, run.spotsRemaining - 1);
    }
    
    return reservation;
  }

  async getGroupDumpReservations(): Promise<GroupDumpReservation[]> {
    return Array.from(this.groupDumpReservations.values());
  }

  async getGroupDumpReservationsByRunId(runId: number): Promise<GroupDumpReservation[]> {
    return Array.from(this.groupDumpReservations.values())
      .filter(reservation => reservation.groupDumpRunId === runId);
  }

  // Quote Requests
  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.quoteRequestIdCounter++;
    const request: QuoteRequest = { 
      ...insertRequest, 
      id, 
      createdAt: new Date()
    };
    this.quoteRequests.set(id, request);
    return request;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }
}

export const storage = new MemStorage();
