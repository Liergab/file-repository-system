export function FilterData(data, searchTerm) {
    return data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }