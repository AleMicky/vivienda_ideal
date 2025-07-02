create table if not exists agente
(
    id_agente           int auto_increment
        primary key,
    nombre              varchar(100)  null,
    ci                  varchar(20)   null,
    telefono            varchar(20)   null,
    email               varchar(100)  null,
    porcentaje_comision decimal(5, 2) null
);

create table if not exists ciudad
(
    id_ciudad int auto_increment
        primary key,
    nombre    varchar(100) not null
);

create table if not exists cliente
(
    id_cliente int auto_increment
        primary key,
    nombre     varchar(100) null,
    ci         varchar(20)  null,
    telefono   varchar(20)  null,
    email      varchar(100) null
);

create table if not exists inmueble
(
    id_inmueble     int auto_increment
        primary key,
    direccion       text                 null,
    precio          decimal(12, 2)       null,
    tipo            varchar(50)          null,
    caracteristicas text                 null,
    disponible      tinyint(1) default 1 null,
    id_ciudad       int                  null,
    id_propietario  int                  null,
    constraint inmueble_ibfk_1
        foreign key (id_ciudad) references ciudad (id_ciudad),
    constraint inmueble_ibfk_2
        foreign key (id_propietario) references cliente (id_cliente)
);

create table if not exists contrato
(
    id_contrato  int auto_increment
        primary key,
    tipo         enum ('alquier', 'venta')               null,
    fecha_inicio date                                    null,
    fecha_fin    date                                    null,
    estado       enum ('Activo', 'Vencido', 'Cancelado') null,
    id_inmueble  int                                     null,
    id_cliente   int                                     null,
    id_agente    int                                     null,
    constraint contrato_ibfk_1
        foreign key (id_inmueble) references inmueble (id_inmueble),
    constraint contrato_ibfk_2
        foreign key (id_cliente) references cliente (id_cliente),
    constraint contrato_ibfk_3
        foreign key (id_agente) references agente (id_agente)
);

create table if not exists comision
(
    id_comision int auto_increment
        primary key,
    id_agente   int            null,
    id_contrato int            null,
    monto       decimal(12, 2) null,
    fecha       date           null,
    constraint comision_ibfk_1
        foreign key (id_agente) references agente (id_agente),
    constraint comision_ibfk_2
        foreign key (id_contrato) references contrato (id_contrato)
);

create index id_agente
    on comision (id_agente);

create index id_contrato
    on comision (id_contrato);

create index id_agente
    on contrato (id_agente);

create index id_cliente
    on contrato (id_cliente);

create index id_inmueble
    on contrato (id_inmueble);

create table if not exists contrato_alquiler
(
    id_contrato   int            not null
        primary key,
    monto_mensual decimal(12, 2) null,
    constraint contrato_alquiler_ibfk_1
        foreign key (id_contrato) references contrato (id_contrato)
);

create table if not exists contrato_venta
(
    id_contrato int            not null
        primary key,
    monto_total decimal(12, 2) null,
    cuotas      int            null,
    constraint contrato_venta_ibfk_1
        foreign key (id_contrato) references contrato (id_contrato)
);

create index id_ciudad
    on inmueble (id_ciudad);

create index id_propietario
    on inmueble (id_propietario);

create table if not exists pago
(
    id_pago     int auto_increment
        primary key,
    id_contrato int                                              null,
    fecha_pago  date                                             null,
    monto       decimal(12, 2)                                   null,
    estado      enum ('pendiente', 'pagado') default 'pendiente' null,
    tipo        enum ('alquiler', 'venta', 'servicio')           not null,
    constraint pago_ibfk_1
        foreign key (id_contrato) references contrato (id_contrato)
);

create index id_contrato
    on pago (id_contrato);

create table if not exists visita
(
    id_visita     int auto_increment
        primary key,
    fecha         datetime null,
    id_inmueble   int      null,
    id_cliente    int      null,
    id_agente     int      null,
    observaciones text     null,
    constraint visita_ibfk_1
        foreign key (id_inmueble) references inmueble (id_inmueble),
    constraint visita_ibfk_2
        foreign key (id_cliente) references cliente (id_cliente),
    constraint visita_ibfk_3
        foreign key (id_agente) references agente (id_agente)
);

create index id_agente
    on visita (id_agente);

create index id_cliente
    on visita (id_cliente);

create index id_inmueble
    on visita (id_inmueble);

create
    definer = root@`%` procedure sp_cliente_ime(IN p_accion varchar(10), IN p_id_cliente int, IN p_nombre varchar(100),
                                                IN p_ci varchar(20), IN p_telefono varchar(20), IN p_email varchar(100))
BEGIN
    DECLARE v_exists INT DEFAULT 0;

    IF p_accion = 'insert' THEN
        INSERT INTO cliente (nombre, ci, telefono, email)
        VALUES (p_nombre, p_ci, p_telefono, p_email);

    ELSEIF p_accion = 'update' THEN
        SELECT COUNT(*) INTO v_exists
        FROM cliente WHERE id_cliente = p_id_cliente;

        IF v_exists > 0 THEN
            UPDATE cliente
            SET nombre = p_nombre,
                ci = p_ci,
                telefono = p_telefono,
                email = p_email
            WHERE id_cliente = p_id_cliente;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cliente no encontrado para actualizar';
        END IF;

    ELSEIF p_accion = 'delete' THEN
        SELECT COUNT(*) INTO v_exists
        FROM cliente WHERE id_cliente = p_id_cliente;

        IF v_exists > 0 THEN
            DELETE FROM cliente WHERE id_cliente = p_id_cliente;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cliente no encontrado para eliminar';
        END IF;
    END IF;
END;

create
    definer = root@`%` procedure sp_reporte_comisiones()
BEGIN
    SELECT
        a.nombre AS agente,
        a.porcentaje_comision,
        COUNT(DISTINCT c.id_contrato) AS contratos,
        SUM(cm.monto) AS total_comision
    FROM agente a
    LEFT JOIN comision cm ON cm.id_agente = a.id_agente
    LEFT JOIN contrato c ON cm.id_contrato = c.id_contrato
    GROUP BY a.id_agente;
END;

create
    definer = root@`%` procedure sp_reporte_contratos()
BEGIN
    SELECT
        c.id_contrato,
        c.tipo,
        c.fecha_inicio,
        c.fecha_fin,
        c.estado,
        cl.nombre AS cliente,
        i.direccion AS inmueble
    FROM contrato c
    JOIN cliente cl ON c.id_cliente = cl.id_cliente
    JOIN inmueble i ON c.id_inmueble = i.id_inmueble;
END;

create
    definer = root@`%` procedure sp_reporte_ingresos_mensuales(IN p_mes int, IN p_anio int)
BEGIN
    SELECT
        p.tipo,
        SUM(p.monto) AS total_ingresos,
        COUNT(*) AS cantidad_pagos
    FROM pago p
    WHERE p.estado = 'pagado'
      AND MONTH(p.fecha_pago) = p_mes
      AND YEAR(p.fecha_pago) = p_anio
    GROUP BY p.tipo;
END;

create
    definer = root@`%` procedure sp_reporte_pagos_pendientes(IN p_mes int, IN p_anio int)
BEGIN
    SELECT
        cl.nombre AS cliente,
        i.direccion AS inmueble,
        p.monto,
        p.fecha_pago,
        p.estado
    FROM pago p
    JOIN contrato c ON p.id_contrato = c.id_contrato
    JOIN cliente cl ON c.id_cliente = cl.id_cliente
    JOIN inmueble i ON c.id_inmueble = i.id_inmueble
    WHERE p.estado = 'pendiente'
      AND MONTH(p.fecha_pago) = p_mes
      AND YEAR(p.fecha_pago) = p_anio;
END;

create
    definer = root@`%` procedure sp_reporte_visitas()
BEGIN
    SELECT
        i.direccion,
        COUNT(v.id_visita) AS cantidad_visitas,
        GROUP_CONCAT(DISTINCT cl.nombre SEPARATOR ', ') AS clientes_interesados
    FROM visita v
    JOIN inmueble i ON v.id_inmueble = i.id_inmueble
    JOIN cliente cl ON v.id_cliente = cl.id_cliente
    GROUP BY v.id_inmueble
    ORDER BY cantidad_visitas DESC;
END;

