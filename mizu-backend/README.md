# Mizu Finance API Documentation

## Base URL

```
https://mizu-backend-one.vercel.app
```

## Authentication

Currently, the API does not require authentication. However, user identification is handled through the `userId` parameter in cart-related endpoints.

## Endpoints

### NFTs

#### Get All NFTs

```
GET /api/nfts
```

Query Parameters:

- `search` (optional): Search NFTs by title, description, or owner

Response:

```json
[
  {
    "id": 1,
    "title": "NFT Title",
    "description": "NFT Description",
    "owner": "0x123...",
    "nftId": "123",
    "nftAddress": "0x456...",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "imageUrl": "https://example.com/image.jpg",
    "price": "100",
    "currency": "ETH",
    "category": "Art",
    "status": "LISTED",
    "createdAt": "2024-04-24T08:00:00Z",
    "updatedAt": "2024-04-24T08:00:00Z"
  }
]
```

#### Get NFT by ID

```
GET /api/nfts/:id
```

Response:

```json
{
  "id": 1,
  "title": "NFT Title",
  "description": "NFT Description",
  "owner": "0x123...",
  "nftId": "123",
  "nftAddress": "0x456...",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "imageUrl": "https://example.com/image.jpg",
  "price": "100",
  "currency": "ETH",
  "category": "Art",
  "status": "LISTED",
  "createdAt": "2024-04-24T08:00:00Z",
  "updatedAt": "2024-04-24T08:00:00Z"
}
```

#### Create NFT

```
POST /api/nfts
```

Request Body:

```json
{
  "title": "NFT Title",
  "description": "NFT Description",
  "owner": "0x123...",
  "nftId": "123",
  "nftAddress": "0x456...",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "imageUrl": "https://example.com/image.jpg",
  "price": "100",
  "currency": "ETH",
  "category": "Art",
  "status": "LISTED"
}
```

Required Fields:

- `title`
- `description`
- `owner`
- `nftId`
- `nftAddress`
- `thumbnail`
- `imageUrl`
- `price`
- `currency`
- `category`

Note: `status` is optional and defaults to "LISTED" if not provided.

#### Update NFT

```
PUT /api/nfts/:id
```

Request Body:

```json
{
  "title": "Updated NFT Title",
  "description": "Updated NFT Description",
  "owner": "0x123...",
  "nftId": "123",
  "nftAddress": "0x456...",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "imageUrl": "https://example.com/image.jpg",
  "price": "150",
  "currency": "ETH",
  "category": "Art",
  "status": "SOLD_OUT"
}
```

#### Delete NFT

```
DELETE /api/nfts/:id
```

### Cart

#### Get User's Cart

```
GET /api/cart/:userId
```

Response:

```json
[
  {
    "id": 1,
    "userId": "user123",
    "nftId": "123",
    "createdAt": "2024-04-24T08:00:00Z",
    "nft": {
      "id": 1,
      "title": "NFT Title",
      "description": "NFT Description",
      "owner": "0x123...",
      "nftId": "123",
      "nftAddress": "0x456...",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "imageUrl": "https://example.com/image.jpg",
      "price": "100",
      "currency": "ETH",
      "category": "Art",
      "status": "LISTED",
      "createdAt": "2024-04-24T08:00:00Z",
      "updatedAt": "2024-04-24T08:00:00Z"
    }
  }
]
```

#### Add to Cart

```
POST /api/cart
```

Request Body:

```json
{
  "userId": "user123",
  "nftId": "123"
}
```

Required Fields:

- `userId`
- `nftId`

#### Delete Cart Item

```
DELETE /api/cart/:id
```

## Status Values

The `status` field in NFTs can have one of the following values:

- `LISTED`: NFT is available for purchase
- `UNLISTED`: NFT is not available for purchase
- `SOLD_OUT`: NFT has been sold
- `PENDING`: NFT is in a pending state

## Error Responses

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": "Error message",
  "details": "Detailed error message"
}
```

Common status codes:

- 400: Bad Request (Missing required fields, invalid data)
- 404: Not Found (Resource not found)
- 409: Conflict (Duplicate entry, unique constraint violation)
- 500: Internal Server Error

## Prisma Error Codes

The API uses Prisma as the ORM, and some errors include Prisma-specific error codes:

- P2002: Unique constraint violation (e.g., duplicate nftId)
- P2003: Foreign key constraint violation (e.g., invalid nftId in cart)
- P2025: Record not found

## Rate Limiting

Currently, there are no rate limits implemented.

## Support

For support or questions, please contact the development team.
