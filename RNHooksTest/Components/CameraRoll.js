import React, { useState } from 'react'

import { useCameraRoll } from '../Hooks/myUseCameraRoll'

import {
    Button,
    ScrollView,
    Image,
} from 'react-native';


const initialState = {
    edges: [],
    page_info: {
        end_cursor: '',
        has_next_page: null,
        start_cursor: ''
    }
};

const defaultConfig = {
    first: 20,
    groupTypes: 'All'
};

let AlbumPhoto = [];

export function GetAlbum() {
    console.log("getAlbum : ");

    const [photos, getPhotos, saveToCameraRoll] = useCameraRoll();

    AlbumPhoto = photos.edges;

    if(AlbumPhoto.length>0){
        return (
            <>
                <ScrollView>
                    {AlbumPhoto.map((p, i) => {
                        return (
                            <Image
                                key={i}
                                style={{
                                    width: 300,
                                    height: 100,
                                }}
                                source={{ uri: p.node.image.uri }}
                            />
                        );
                    })}
                </ScrollView>
            </>
        );
    }else{
        return(
            <>
                <Button title='Get Photos' onPress={() => getPhotos()}> Get Photos </Button>
            </>
        )

    }
}
