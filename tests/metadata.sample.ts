import { toJsonSchema } from '@ts-to-json-schema/core';

interface MetadataSample {
  /**
   * The id of the sample
   * @minimum 1
   * @maximum 1000
   */
  id: number;

  /**
   * The title of the sample
   * @minLength 3
   * @maxLength 100
   */
  title: string;

  /**
   * The description of the sample
   * @deprecated This field is deprecated and will be removed in the next version
   */
  description?: string;

  /**
   * The status of the sample
   * @example "active"
   * @since 1.0.0
   * @default "pending"
   */
  status?: string;

  /**
   * The tags of the sample
   * @see https://example.com/docs/tags
   */
  tags?: string[];

  /**
   * The email of the sample
   * @format email
   */
  email?: string;
}

[
  [toJsonSchema<MetadataSample>(), {
    type: 'object',
    properties: {
      id: { 
        type: 'number', 
        description: 'The id of the sample',
        minimum: 1,
        maximum: 1000
      },
      title: { 
        type: 'string', 
        description: 'The title of the sample',
        minLength: 3,
        maxLength: 100
      },
      description: { 
        type: 'string', 
        description: 'The description of the sample', 
        deprecated: true 
      },
      status: {
        type: 'string',
        description: 'The status of the sample',
        examples: ['active'],
        since: '1.0.0',
        default: 'pending'
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'The tags of the sample',
        see: 'https://example.com/docs/tags'
      },
      email: {
        type: 'string',
        description: 'The email of the sample',
        format: 'email'
      }
    },
    required: ['id', 'title']
  }]
]
