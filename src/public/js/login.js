"use strict";

const btnIniciarSesion = document.getElementById('btn-iniciar-sesion');

const login = () => {

    let usuario = document.getElementById('usuario').value.trim();
    let contrasenia = document.getElementById('contrasenia').value.trim();

    if( usuario.length === 0 && contrasenia.length === 0 ) {
        return Swal.fire({
            icon: 'info',
            title: 'Escribe tus credenciales de acceso (Notepad)',
            confirmButtonText: 'OK'
        });
    }

    if( usuario.length === 0) {
        return Swal.fire({

            icon: 'info',
            title: 'Escribe tu nombre de usuario, o EX',
            confirmButtonText: 'OK'
        });
    }

    if( contrasenia.length === 0 ) {

        return Swal.fire({
            icon: 'info',
            title: 'Escribe tu contraseña',
            confirmButtonText: 'OK'
        });
    }


    $.ajax({
        url: '/login',
        type: 'POST',
        data: { "usuario": usuario, "contrasenia": contrasenia },
        beforeSend: () => {
            
        },
        success: (res) => {

            console.log('RESPUESTA SERVER', res )

            if( !res.accede ) {

                Swal.fire({ 
                    icon: 'warning',
                    title: res.msg,
                    text: 'Si crees que es un error, solicita una revisión inmediatamente a tu jefe/supervisor directo.',
                    confirmButtonText: 'OK'
                })
                
                console.log('NO ACCEDE')
            }
            else {

                window.location.href = res.url;

                console.log('vamos al avista correspondiente', )
            }

        },
        error: (a, b, c) => {

            console.log(`Server Error Info: ${a.statusText}\n${b}\n${c}`);
        }
    });

}

btnIniciarSesion.addEventListener('click', login);
