import { Test, TestingModule } from '@nestjs/testing'
import { SubcategoryService } from './subcategory.service'

describe('BlogService', () => {
  let service: SubcategoryService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcategoryService],
    }).compile()
    service = module.get<SubcategoryService>(SubcategoryService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
