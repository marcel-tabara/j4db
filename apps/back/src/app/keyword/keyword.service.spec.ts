import { Test, TestingModule } from '@nestjs/testing'
import { KeywordService } from './keyword.service'

describe('BlogService', () => {
  let service: KeywordService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordService],
    }).compile()
    service = module.get<KeywordService>(KeywordService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
