window.PORTAL_DATA = {
    tramites: {
        permiso: {
            tag: 'Dirección de Tránsito',
            title: 'Permiso de Circulación y Licencias',
            desc: 'Realiza la renovación anual de tu Permiso de Circulación sin filas o reserva tu hora para primera licencia y renovación.',
            reqs: [
                'Permiso de circulación anterior pagado.',
                'Certificado de Revisión Técnica y de Gases vigente.',
                'Seguro Obligatorio de Accidentes Personales (SOAP).',
                'Cédula de identidad vigente para licencias de conducir.'
            ]
        },
        salud: {
            tag: 'Salud Municipal • CESFAM',
            title: 'Portal Paciente CESFAM El Monte',
            desc: 'Plataforma digital de salud primaria para vecinos inscritos en el CESFAM y postas rurales de la comuna.',
            reqs: [
                'Estar inscrito en el CESFAM El Monte o centro de salud comunal.',
                'ClaveÚnica o RUT para acceder a horas médicas y recetas.',
                'Horario de extensión horaria: Lunes a Viernes hasta las 20:00 hrs.'
            ]
        },
        fondeve: {
            tag: 'DIDECO • Participación Vecinal',
            title: 'Fondo de Desarrollo Vecinal (FONDEVE)',
            desc: 'Financiamiento municipal para proyectos de equipamiento, seguridad, cultura y mejoramiento comunitario.',
            reqs: [
                'Personalidad jurídica vigente de la organización comunitaria.',
                'Certificado de directorio vigente emitido por Registro Civil.',
                'Formulario de postulación y cotizaciones del proyecto.'
            ]
        },
        omil: {
            tag: 'Fomento Productivo y OMIL',
            title: 'Oficina Municipal de Información Laboral',
            desc: 'Conectamos el talento de El Monte con empresas de la provincia de Talagante y la Región Metropolitana.',
            reqs: [
                'Currículum Vitae actualizado (digital o impreso).',
                'Cédula de identidad vigente.',
                'Inscripción gratuita en la Bolsa Nacional de Empleo (BNE).'
            ]
        },
        transparencia: {
            tag: 'Ley N° 20.285',
            title: 'Transparencia Activa y Solicitud de Información',
            desc: 'Accede a la dotación municipal, presupuestos, actas de Concejo Municipal, licitaciones y solicitudes ciudadanas.',
            reqs: [
                'Acceso libre y sin registro para Transparencia Activa.',
                'Para Solicitud de Información Pública: indicar nombre, correo y detalle claro de lo requerido (plazo legal 20 días hábiles).'
            ]
        },
        ordenanzas: {
            tag: 'Secretaría Municipal',
            title: 'Ordenanzas, Cementerio y Ambiente',
            desc: 'Consulta las ordenanzas locales vigentes, trámites del Cementerio Municipal y programas ambientales.',
            reqs: [
                'Ordenanza de Tenencia Responsable de Mascotas.',
                'Plan de Acción Comunal de Cambio Climático (PACCC).',
                'Atención presencial en Av. Los Libertadores #277.'
            ]
        }
    },

    hitos: [
        {
            badge: 'Parada 01 • Naturaleza y Territorio',
            title: 'Humedal Río Mapocho y Paisaje Local',
            subtitle: 'Restauración Socioecológica y Tradiciones',
            desc: 'Espacio natural de alto valor ecológico donde los estudiantes observan la flora y fauna nativa del valle central, comprendiendo la relación entre el territorio rural, el agua y la identidad campesina de El Monte.',
            edu: 'Ciencias Naturales y Geografía: biodiversidad local, cuidado del agua y sustentabilidad comunitaria.',
            img: 'assets/img/hitos/Plaza.jpg'

        },
        {
            badge: 'Parada 02 • Patrimonio Colonial',
            title: 'Iglesia San Francisco de Asís',
            subtitle: 'Monumento Histórico y Símbolo de El Monte',
            desc: 'Construcción colonial emblemática que ha acompañado el desarrollo de la comuna desde sus orígenes. Su torre campanario es el ícono central de nuestra nueva identidad visual y punto de encuentro de tradiciones montinas.',
            edu: 'Arquitectura colonial chilena, vida cotidiana en el valle central y conservación del patrimonio material.',
            img: 'assets/img/hitos/Iglesia.jpg'
        },
        {
            badge: 'Parada 03 • Memoria Viva',
            title: 'Museo Patrimonial de El Monte',
            subtitle: 'Archivo Histórico, Objetos y Relatos Locales',
            desc: 'Un recorrido por vitrinas, documentos antiguos, fotografías y objetos que resguardan la historia de nuestra gente. Cada pieza cuenta una historia que conecta el pasado rural e independentista con el presente.',
            edu: 'Análisis de fuentes históricas primarias, memoria local e investigación escolar en terreno.',
            img: 'assets/img/hitos/Museo.jpg'
        },
        {
            badge: 'Parada 04 • Inicio de Ruta',
            title: 'Casa de los Carrera / Fundo San Miguel',
            subtitle: 'Legado de Javiera y José Miguel Carrera',
            desc: 'Hogar histórico de la familia protagonista de la Independencia de Chile. Aquí Javiera Carrera y sus hermanos gestaron hitos clave de la Patria Vieja. Un espacio vivo donde los estudiantes comprenden el nacimiento de nuestra identidad republicana.',
            edu: 'Proceso de Independencia de Chile, rol de las mujeres en la historia (Javiera Carrera) y patrimonio arquitectónico rural.',
            img: 'assets/img/hitos/Casa_carreras.jpg'
        }
    ],

    tourScenes: [
        {
            sectionId: 'inicio',
            label: 'Escena 1/5: Identidad',
            subtitle: '“¡Hola vecinos y profes! Bienvenidos al nuevo portal digital de El Monte, renovado con la identidad ‘Donde nace la patria’.”',
            duration: 9
        },
        {
            sectionId: 'tramites',
            label: 'Escena 2/5: Trámites',
            subtitle: '“Eliminamos la saturación visual: ahora los trámites de Permiso de Circulación, Salud CESFAM y FONDEVE están ordenados en un clic.”',
            duration: 9
        },
        {
            sectionId: 'ruta-patria',
            label: 'Escena 3/5: Ruta de la Patria',
            subtitle: '“¡(Re)Vive la Patria! Explora nuestro mapa patrimonial con la Casa de los Carrera, la Iglesia San Francisco y salidas pedagógicas.”',
            duration: 10
        },
        {
            sectionId: 'noticias',
            label: 'Escena 4/5: Actualidad',
            subtitle: '“Noticias comunales claras y unificadas: operativos Muni en tu Barrio, fondos vecinales y salud digital.”',
            duration: 8
        },
        {
            sectionId: 'contacto',
            label: 'Escena 5/5: Contacto y OIRS',
            subtitle: '“Y en el nuevo apartado de Contacto Ciudadano puedes escribirnos directamente, agendar tours o llamar a emergencias 24/7.”',
            duration: 9
        }
    ]
};