#!/bin/bash  
for i in src/graphql/**/*.gql;
 do
    cp "$i" "dist/$i"
 done 