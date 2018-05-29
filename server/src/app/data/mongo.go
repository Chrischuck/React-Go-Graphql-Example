package mongo

import (
	"context"

	"github.com/mongodb/mongo-go-driver/mongo"
)

// the docs are currently wrong and will tell you to use newClient instead of Connect
var Client, err = mongo.Connect(context.Background(), "Mongo URI...", nil)
