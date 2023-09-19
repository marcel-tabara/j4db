import { Test, TestingModule } from '@nestjs/testing'
import { SubcategoryController } from './subcategory.controller'

describe('Subcategory Controller', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SubcategoryController],
    }).compile()
  })
  it('should be defined', () => {
    const controller: SubcategoryController = module.get<SubcategoryController>(
      SubcategoryController
    )
    expect(controller).toBeDefined()
  })
})
