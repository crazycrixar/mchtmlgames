        function loopAudio() {
            var audio = new Audio('THE COMPLETE MINECRAFT SOUNDTRACK.mp3');
            audio.addEventListener('ended', function() {
                audio.currentTime = 0;
                audio.play();
            });
            audio.play();
        }
        loopAudio();