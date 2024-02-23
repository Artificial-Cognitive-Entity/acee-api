import bcrypt from "bcrypt";
import generator from "generate-password";

export async function generatePassword() {

  const password = generator.generate({
    length: 10,
    numbers: true,
  });


    // hash the password 10 times
  return  await bcrypt.hash(password,10)

}
