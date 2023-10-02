export const get_sdgs_indexes = (task) => {
  const content = task.content.replace(/'/g, '"');
  const content_parsed = JSON.parse(content);

  const sdgs_indexes = [];
  for (let index = 1; index <= 27; index++) {
    if (content_parsed["sdgs-" + index.toString()] != "1") {
      continue;
    }

    const sdgs_index = String(index).padStart(2, "0");
    sdgs_indexes.push(sdgs_index);
  }

  return sdgs_indexes;
};
