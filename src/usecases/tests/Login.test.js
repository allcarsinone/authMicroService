const LoginUseCase = require('../LoginUseCase/Login.usecase')
const InMemoryUserRepository = require('../../repositories/InMemoryUserRepository')
const User = require('../../entities/User')

const testAlgorithm = (password, hash) => password === hash
describe('LoginUseCase', () => {
  let userRepository, sut
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    sut = new LoginUseCase(userRepository)
    userRepository.create(new User({ name: 'John Doe', username: 'johndoe', email: 'test@test.com', password: '12345678', role_id: 1 }))
  })
  it('should login a user', async () => {
    const result = await sut.execute({
      email: 'test@test.com',
      password: '12345678'
    }, testAlgorithm)
    expect(result.success).toBe(true)
    expect(result.data).toHaveProperty('id')
    expect(result.data).toHaveProperty('name', 'John Doe')
    expect(result.data).toHaveProperty('username', 'johndoe')
    expect(result.data).toHaveProperty('email', 'test@test.com')
  })
  it('should return a result.failed if email is wrong', async () => {
    const result = await sut.execute({
      email: 'test',
      password: '12345678'
    }, testAlgorithm)
    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Email or password incorrect')
  })
  it('should return a result.failed if password is wrong', async () => {
    const result = await sut.execute({
      email: 'test@test.com',
      password: '1234567' // wrong password
    }, testAlgorithm)
    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Email or password incorrect')
  })
})
