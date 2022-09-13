import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(listData: any[], filterText: string) {
    if (listData.length === 0 || filterText === '') {
      return listData;
    } else {
      return listData.filter((listData) => {
        var keys = Object.keys(listData);
        //console.log(listData.Status);
        if (keys.length == 1)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 2)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 3)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 4)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 5)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 6)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 7)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 8)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 9)
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[8]].toString().toLowerCase().includes(filterText.toLowerCase());
        else
          return listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[8]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[9]].toString().toLowerCase().includes(filterText.toLowerCase());
      })
    }
  }
}

