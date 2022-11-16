import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(listData: any[], filterText: string) {
    if (listData == undefined || listData.length === 0 || filterText === '') {
      return listData;
    } else {
      return listData.filter((listData) => {
        var keys = Object.keys(listData);
        console.log(listData);
        if (keys.length == 1)
          return  listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 2)
          return  listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 3)
          return  listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 4)
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 5)
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]] != null && listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 6)
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]] != null && listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]] != null && listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 7)
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]] != null && listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]] != null && listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]] != null && listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 8)
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]] != null && listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]] != null && listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]] != null && listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]] != null && listData[keys[7]].toString().toLowerCase().includes(filterText.toLowerCase());
        else if (keys.length == 9)
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]] != null && listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]] != null && listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]] != null && listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]] != null && listData[keys[7]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[8]] != null && listData[keys[8]].toString().toLowerCase().includes(filterText.toLowerCase());
        else
          return listData[keys[0]] != null && listData[keys[0]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[1]] != null && listData[keys[1]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[2]] != null && listData[keys[2]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[3]] != null && listData[keys[3]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[4]] != null && listData[keys[4]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[5]] != null && listData[keys[5]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[6]] != null && listData[keys[6]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[7]] != null && listData[keys[7]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[8]] != null && listData[keys[8]].toString().toLowerCase().includes(filterText.toLowerCase())
            || listData[keys[9]] != null && listData[keys[9]].toString().toLowerCase().includes(filterText.toLowerCase());
      })
    }
  }
}

