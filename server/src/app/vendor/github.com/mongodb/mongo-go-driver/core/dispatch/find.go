// Copyright (C) MongoDB, Inc. 2017-present.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

package dispatch

import (
	"context"

	"github.com/mongodb/mongo-go-driver/core/command"
	"github.com/mongodb/mongo-go-driver/core/description"
	"github.com/mongodb/mongo-go-driver/core/readconcern"
	"github.com/mongodb/mongo-go-driver/core/topology"
)

// Find handles the full cycle dispatch and execution of a find command against the provided
// topology.
func Find(
	ctx context.Context,
	cmd command.Find,
	topo *topology.Topology,
	selector description.ServerSelector,
	rc *readconcern.ReadConcern,
) (command.Cursor, error) {

	ss, err := topo.SelectServer(ctx, selector)
	if err != nil {
		return nil, err
	}

	if rc != nil {
		opt, err := readConcernOption(rc)
		if err != nil {
			return nil, err
		}
		cmd.Opts = append(cmd.Opts, opt)
	}

	desc := ss.Description()
	conn, err := ss.Connection(ctx)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	return cmd.RoundTrip(ctx, desc, ss, conn)
}
