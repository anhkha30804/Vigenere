import { useState } from 'react'

const VigenereCipher = () => {
   const [alphabet, setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
   const [plaintext, setPlaintext] = useState('')
   const [key, setKey] = useState('')
   const [encryptedText, setEncryptedText] = useState('')
   const [decryptedText, setDecryptedText] = useState('')
   const [error, setError] = useState('')

   const handleAlphabetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newAlphabet = e.target.value.replace(/\s/g, '')
      if (new Set(newAlphabet).size === newAlphabet.length) {
         setAlphabet(newAlphabet)
      }
   }

   const filterValidChars = (input: string) => {
      return input
         .split('')
         .filter((char) => alphabet.includes(char))
         .join('')
   }

   const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKey(filterValidChars(e.target.value))
   }

   const handlePlainTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlaintext(filterValidChars(e.target.value))
   }

   const repeatKey = (key: string, text: string) => {
      let res = key
      while (res.length < text.length) res += key
      return res.substring(0, text.length)
   }

   const handleEncrypt = (e: React.FormEvent) => {
      e.preventDefault()
      if (!alphabet) {
         setError('Vui lòng nhập Alphabet')
         return
      }
      if (!plaintext || !key) {
         setError('Vui lòng nhập đầy đủ plaintext và key')
         return
      }
      setError('')
      const alpMap = Object.fromEntries([...alphabet].map((c, i) => [c, i]))
      const rpKey = repeatKey(key, plaintext)
      const encrypted = plaintext
         .split('')
         .map(
            (char, i) =>
               alphabet[(alpMap[char] + alpMap[rpKey[i]]) % alphabet.length]
         )
         .join('')
      setEncryptedText(encrypted)
   }

   const decrypt = () => {
      if (!alphabet) {
         setError('Vui lòng nhập Alphabet trước khi giải mã')
         return
      }
      const alpMap = Object.fromEntries([...alphabet].map((c, i) => [c, i]))
      const rpKey = repeatKey(key, encryptedText)
      const decrypted = encryptedText
         .split('')
         .map(
            (char, i) =>
               alphabet[
                  (alpMap[char] - alpMap[rpKey[i]] + alphabet.length) %
                     alphabet.length
               ]
         )
         .join('')
      setDecryptedText(decrypted)
   }

   return (
      <div className="flex h-screen items-center justify-center">
         <div className="w-2/3 rounded-lg bg-white p-[50px] shadow-xl">
            <div className="grid grid-cols-2 gap-8">
               {/* Cột Nhập Liệu */}
               <form className="space-y-6" onSubmit={handleEncrypt}>
                  <div>
                     <label className="block text-lg font-semibold">Alphabet</label>
                     <input
                        type="text"
                        required
                        className="mt-1 w-full rounded border p-3"
                        placeholder="Nhập alphabet"
                        value={alphabet}
                        onChange={handleAlphabetChange}
                     />
                  </div>
                  <div>
                     <label className="block text-lg font-semibold">PlainText</label>
                     <input
                        type="text"
                        required
                        className="mt-1 w-full rounded border p-3"
                        placeholder="Nhập plaintext"
                        value={plaintext}
                        onChange={handlePlainTextChange}
                     />
                  </div>
                  <div>
                     <label className="block text-lg font-semibold">Key</label>
                     <input
                        type="text"
                        required
                        className="mt-1 w-full rounded border p-3"
                        placeholder="Nhập key"
                        value={key}
                        onChange={handleKeyChange}
                     />
                  </div>
                  {error && <div className="text-sm text-red-500">{error}</div>}
               </form>

               {/* Cột Mã Hóa & Giải Mã */}
               <div className="space-y-6">
                  <div>
                     <label className="block text-lg font-semibold">Mã Hóa</label>
                     <input
                        type="text"
                        className="mt-1 w-full rounded border bg-gray-200 p-3"
                        value={encryptedText}
                        readOnly
                     />
                  </div>
                  <button
                     type="submit"
                     className="w-full rounded bg-blue-600 p-3 text-lg text-white"
                     onClick={handleEncrypt}
                  >
                     Mã hóa
                  </button>
                  <div>
                     <label className="block text-lg font-semibold">Giải Mã</label>
                     <input
                        type="text"
                        className="mt-1 w-full rounded border bg-gray-200 p-3"
                        value={decryptedText}
                        readOnly
                     />
                  </div>
                  <button
                     className="w-full rounded bg-green-600 p-3 text-lg text-white"
                     onClick={decrypt}
                  >
                     Giải mã
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VigenereCipher
