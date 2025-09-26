function generateWordAudio(word) {
    return new Promise((resolve, reject) => {
        // Crear utterance
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        
        // Crear MediaRecorder para grabar el audio
        const audioChunks = [];
        const audioCtx = new AudioContext();
        const destination = audioCtx.createMediaStreamDestination();
        const mediaRecorder = new MediaRecorder(destination.stream);
        
        mediaRecorder.ondataavailable = (e) => {
            audioChunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            resolve(audioUrl);
        };
        
        // Iniciar grabación
        mediaRecorder.start();
        window.speechSynthesis.speak(utterance);
        
        utterance.onend = () => {
            mediaRecorder.stop();
        };
    });
}

// Uso:
async function downloadAllWordAudios() {
    for(const word of wordList) {
        try {
            const audioUrl = await generateWordAudio(word);
            // Aquí puedes descargar el archivo
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = `${word}.mp3`;
            a.click();
        } catch(err) {
            console.error(`Error generando audio para ${word}:`, err);
        }
    }
}