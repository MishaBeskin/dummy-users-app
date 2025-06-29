import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    service.clearCache(); // Ensure clean state
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', async () => {
    const user = { firstName: 'Test', lastName: 'User', age: 20, gender: 'male', email: 'test@test.com', phone: '', username: '', password: '', birthDate: '', image: '', bloodGroup: '', height: 0, weight: 0, eyeColor: '', hair: { color: '', type: '' }, ip: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' }, macAddress: '', university: '', bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' }, company: { department: '', name: '', title: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' } }, ein: '', ssn: '', userAgent: '', crypto: { coin: '', wallet: '', network: '' }, role: '' };
    const added = await service.add(user as any);
    expect(added.firstName).toBe('Test');
    const list = await service.list();
    expect(list.users.length).toBeGreaterThan(0);
  });

  it('should update a user', async () => {
    const user = await service.add({ firstName: 'A', lastName: 'B', age: 20, gender: 'male', email: 'a@b.com', phone: '', username: '', password: '', birthDate: '', image: '', bloodGroup: '', height: 0, weight: 0, eyeColor: '', hair: { color: '', type: '' }, ip: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' }, macAddress: '', university: '', bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' }, company: { department: '', name: '', title: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' } }, ein: '', ssn: '', userAgent: '', crypto: { coin: '', wallet: '', network: '' }, role: '' } as any);
    user.firstName = 'Updated';
    const updated = await service.update(user);
    expect(updated.firstName).toBe('Updated');
  });

  it('should delete a user', async () => {
    const user = await service.add({ firstName: 'Del', lastName: 'User', age: 20, gender: 'male', email: 'del@user.com', phone: '', username: '', password: '', birthDate: '', image: '', bloodGroup: '', height: 0, weight: 0, eyeColor: '', hair: { color: '', type: '' }, ip: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' }, macAddress: '', university: '', bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' }, company: { department: '', name: '', title: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' } }, ein: '', ssn: '', userAgent: '', crypto: { coin: '', wallet: '', network: '' }, role: '' } as any);
    await service.delete(user.id!);
    const list = await service.list();
    expect(list.users.find(u => u.id === user.id)).toBeUndefined();
  });
});
