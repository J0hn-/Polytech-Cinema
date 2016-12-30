import { Director } from "../director/director";
import { Genre } from "../genre/genre";

export class Film {
    public id: number;
    public title: string;
    public duration: number;
    public release_date: string;
    public director: Director;
    public genre: Genre;
}
