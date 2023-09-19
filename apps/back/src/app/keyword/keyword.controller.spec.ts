import { Test, TestingModule } from '@nestjs/testing'
import { KeywordController } from './keyword.controller'

describe('Keyword Controller', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [KeywordController],
    }).compile()
  })
  it('should be defined', () => {
    const controller: KeywordController =
      module.get<KeywordController>(KeywordController)
    expect(controller).toBeDefined()
  })
})
