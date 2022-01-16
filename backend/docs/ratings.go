package docs

import (
	"github.com/elhmn/camerdevs/pkg/models/v1beta"
)

// swagger:route GET /ratings ratings idOfRatingWithoutID
// Ratings returns the list of ratings
// responses:
//   200: ratingsResponse
//   400: badRequestResponse
//   404: notFoundResponse

// swagger:route GET /ratings/{id} ratings idOfRating
// Ratings returns the list of ratings
// responses:
//   200: ratingsResponse
//   400: badRequestResponse
//   404: notFoundResponse

// This text will appear as description of your response body.
// swagger:response ratingsResponse
type RatingsResponseWrapper struct {
	// in:body
	Body []v1beta.Rating
}

// swagger:response badRequestResponse
type RatingsBadRequestResponseWrapper struct {
	// in:body
	Body struct {
		// Example: bad request
		Error string `json:"error"`
	}
}

// swagger:response notFoundResponse
type RatingsNotFoundResponseWrapper struct {
	// in:body
	Body struct {
		// Example: could not found
		Error string `json:"error"`
	}
}

// swagger:parameters idOfRating
type RatingParam struct {
	//in:path
	//example: 1
	ID string `json:"id"`
}