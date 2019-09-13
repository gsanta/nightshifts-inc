
export const meshDescriptors = [
    {
        type: 'player',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/player/',
            fileName: 'player.babylon',
            scale: 0.28
        },
        materials: [
            'models/player/material/0.jpg',
            'models/player/material/1.jpg',
            'models/player/material/2.jpg',
            'models/player/material/3.jpg'
        ],
    },
    {
        type: 'door',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/',
            fileName: 'door.babylon',
            scale: 1
        },
        materials: [],
        realDimensions: {
            name: 'border-dimensions-descriptor' as 'border-dimensions-descriptor',
            width: 2.7
        }
    },
    {
        type: 'window',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        translateY: -0.5,
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/',
            fileName: 'window.babylon',
            scale: 1
        },
        materials: [
            '#FFFFFF'
        ],
        realDimensions: {
            name: 'border-dimensions-descriptor' as 'border-dimensions-descriptor',
            width: 2
        }
    },
    // {
    //     type: 'bed',
    //     name: 'mesh-descriptor' as 'mesh-descriptor',
    //     details: {
    //         name: 'file-descriptor' as 'file-descriptor',
    //         path: 'models/furniture_1/',
    //         fileName: 'bed.babylon',
    //         scale: 0.03
    //     },
    //     materials: ['models/furniture_1/material/beds.png'],
    // },
    {
        type: 'washbasin',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_3/',
            fileName: 'wash_basin.babylon',
            scale: 3
        },
        materials: ['models/furniture_3/material/bathroom.png'],
    },
    {
        type: 'bathtub',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_3/',
            fileName: 'bathtub.babylon',
            scale: 3
        },
        materials: ['models/furniture_3/material/bathroom.png'],
    },
    {
        type: 'chair',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_3/',
            fileName: 'chair.babylon',
            scale: 3
        },
        materials: ['models/furniture_3/material/bathroom.png'],
    },
    {
        type: 'table',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_2/',
            fileName: 'table.babylon',
            scale: 0.03
        },
        materials: ['models/furniture_2/material/furniture.png'],
    },
    {
        type: 'cupboard',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_2/',
            fileName: 'cupboard.babylon',
            scale: 0.03
        },
        materials: ['models/furniture_2/material/furniture.png'],
    },
    {
        type: 'room',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'room-descriptor' as 'room-descriptor',
            roofMaterialPath: './assets/textures/roof.jpeg',
            roofY: 7.21
        }
    },
    {
        type: 'portal',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'shape-descriptor' as 'shape-descriptor',
            shape: 'disc',
            translateY: 2
        }
    },
    {
        type: 'wall',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'shape-descriptor' as 'shape-descriptor',
            shape: 'rect',
        },
        conditionalMaterials: [
            {
                name: 'parent-room-based-material-descriptor' as 'parent-room-based-material-descriptor',
                parentId: 'root-1',
                path: './assets/textures/brick.jpeg'
            }
        ],
        materials: [
            '#FFFFFF'
        ],
    },
    {
        type: 'bed',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/',
            fileName: 'bed.babylon',
            scale: 3

        },
        materials: ['models/bed_material.png'],
    },
];
