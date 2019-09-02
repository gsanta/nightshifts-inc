
export const meshDescriptors = [
    {
        type: 'player',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/player/',
            fileName: 'player.babylon',
            materials: [
                'models/player/material/0.jpg',
                'models/player/material/1.jpg',
                'models/player/material/2.jpg',
                'models/player/material/3.jpg'
            ],
            scale: 0.28
        }
    },
    {
        type: 'door',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/',
            fileName: 'door.babylon',
            materials: [],
            scale: 1
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
            materials: [],
            scale: 1
        }
    },
    {
        type: 'bed',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_1/',
            fileName: 'bed.babylon',
            materials: ['models/furniture_1/material/beds.png'],
            scale: 0.03
        }
    },
    {
        type: 'washbasin',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_3/',
            fileName: 'wash_basin.babylon',
            materials: ['models/furniture_3/material/bathroom.png'],
            scale: 3
        }
    },
    {
        type: 'bathtub',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_3/',
            fileName: 'bathtub.babylon',
            materials: ['models/furniture_3/material/bathroom.png'],
            scale: 3
        }
    },
    {
        type: 'chair',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_3/',
            fileName: 'chair.babylon',
            materials: ['models/furniture_3/material/bathroom.png'],
            scale: 3
        }
    },
    {
        type: 'table',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_2/',
            fileName: 'table.babylon',
            materials: ['models/furniture_2/material/furniture.png'],
            scale: 0.03
        }
    },
    {
        type: 'cupboard',
        name: 'mesh-descriptor' as 'mesh-descriptor',
        details: {
            name: 'file-descriptor' as 'file-descriptor',
            path: 'models/furniture_2/',
            fileName: 'cupboard.babylon',
            materials: ['models/furniture_2/material/furniture.png'],
            scale: 0.03
        }
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
            conditionalMaterial: {
                name: 'parent-based-material'
            }
        }
    },
];
