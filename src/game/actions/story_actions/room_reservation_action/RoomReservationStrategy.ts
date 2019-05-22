import { WorldItem } from '../../../world/world_items/item_types/WorldItem';


export interface RoomReservationStrategy {
    chooseRoom(rooms: WorldItem[]): WorldItem;
}
