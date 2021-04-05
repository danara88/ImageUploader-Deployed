export class FileItem {
    public file: File;
    public name: string;
    public size: number;
    constructor( file: File ) {
        this.file = file;
        this.name = this.file.name;
        this.size = this.file.size;
    }
}