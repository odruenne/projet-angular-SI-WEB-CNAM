import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'transformToAsterisk',
    standalone: true,
})
export class TransformToAsteriskPipe implements PipeTransform {
    transform(value: string) {
        return value.replace(/\d/g, '*');
    }
}