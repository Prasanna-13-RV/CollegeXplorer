import axios from 'axios';
export const getNotes = async className => {
  return await axios.get(
    `https://busy-ruby-snail-boot.cyclic.app/api/notes/${className}`,
  );
};
