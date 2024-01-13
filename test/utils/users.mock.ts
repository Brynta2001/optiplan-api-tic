import { mockTasks } from "./tasks.mock"

export const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
}

export const mockUser ={
    id: 'e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c',
    fullName: 'John Doe',
    email: 'bryan.tapia03@epn.edu.ec',
    password: '$2b$10$7ZHhHiXx/2fH8vLpdXXMbOP6SbJYn5KwymtAAjAqbdzbbC4PyQ0g.',
    roles: ['area_manager'],
    department: 'IT',
    task: mockTasks[0],
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    },
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
}