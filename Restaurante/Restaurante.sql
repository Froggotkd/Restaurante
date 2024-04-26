--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

-- Started on 2024-04-26 01:20:17 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 217 (class 1255 OID 24579)
-- Name: checkCedula(character varying, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."checkCedula"(nombre_input character varying, cedula_input bigint) RETURNS boolean
    LANGUAGE plpgsql
    AS $$DECLARE
    nombre_existente TEXT;
BEGIN
    SELECT cliente_nombre INTO nombre_existente FROM cliente WHERE cliente_cedula = cedula_input;
    IF nombre_existente IS NOT NULL AND nombre_existente != nombre_input THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
END;
$$;


ALTER FUNCTION public."checkCedula"(nombre_input character varying, cedula_input bigint) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    cliente_id integer NOT NULL,
    cliente_nombre character varying,
    cliente_cedula bigint,
    cliente_correo character varying,
    cliente_direccion character varying,
    cliente_telefono character varying
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: Cliente_cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cliente_cliente_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cliente_cliente_id_seq" OWNER TO postgres;

--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 209
-- Name: Cliente_cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cliente_cliente_id_seq" OWNED BY public.cliente.cliente_id;


--
-- TOC entry 212 (class 1259 OID 16395)
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    plato_id integer NOT NULL,
    plato_nombre character varying,
    plato_precio numeric,
    plato_descripcion character varying,
    plato_disponibilidad boolean,
    plato_imagen character varying,
    plato_categoria character varying
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16394)
-- Name: menu_plato_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_plato_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_plato_id_seq OWNER TO postgres;

--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 211
-- Name: menu_plato_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_plato_id_seq OWNED BY public.menu.plato_id;


--
-- TOC entry 215 (class 1259 OID 16412)
-- Name: orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orden (
    orden_id integer NOT NULL,
    orden_precio numeric,
    orden_preciofinal numeric,
    orden_cliente integer,
    orden_fecha date,
    orden_iva numeric
);


ALTER TABLE public.orden OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16411)
-- Name: orden_orden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orden_orden_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orden_orden_id_seq OWNER TO postgres;

--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 214
-- Name: orden_orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orden_orden_id_seq OWNED BY public.orden.orden_id;


--
-- TOC entry 213 (class 1259 OID 16403)
-- Name: pedido_detalle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido_detalle (
    detalle_platos integer,
    detalle_id integer NOT NULL,
    "detalle_ordenID" integer,
    detalle_cantidad integer
);


ALTER TABLE public.pedido_detalle OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16423)
-- Name: pedido_detalle_detalle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_detalle_detalle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedido_detalle_detalle_id_seq OWNER TO postgres;

--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 216
-- Name: pedido_detalle_detalle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_detalle_detalle_id_seq OWNED BY public.pedido_detalle.detalle_id;


--
-- TOC entry 3187 (class 2604 OID 16389)
-- Name: cliente cliente_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN cliente_id SET DEFAULT nextval('public."Cliente_cliente_id_seq"'::regclass);


--
-- TOC entry 3188 (class 2604 OID 32782)
-- Name: menu plato_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN plato_id SET DEFAULT nextval('public.menu_plato_id_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 16415)
-- Name: orden orden_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden ALTER COLUMN orden_id SET DEFAULT nextval('public.orden_orden_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 16424)
-- Name: pedido_detalle detalle_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_detalle ALTER COLUMN detalle_id SET DEFAULT nextval('public.pedido_detalle_detalle_id_seq'::regclass);


--
-- TOC entry 3343 (class 0 OID 16386)
-- Dependencies: 210
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (cliente_id, cliente_nombre, cliente_cedula, cliente_correo, cliente_direccion, cliente_telefono) FROM stdin;
2	Jan	1778805	\N	\N	\N
1	Juan	170805	juan@gmail.com	\N	\N
3	Daniel	175240213	daniel@daniel	Quito	022871014
4	invalid	9999999999	correo@correo	invalid	99999999
5	José Pérez	172741520368	jperez@gmail.com	Quito	022651014
6	Alana Alanesa	1010101010	alanaalana@alana	Sangolqui	0228541
7	Marco Marquez	6565650	marco@marco	Quito	2314134234
8	Daniel Daniel	100000	daniel@danielll	adasd	23424
9	Jaun 	1010	juan@jaun	Quito	123456
10	Paula Perez	17245012	pperez@gmail.com	Quito	0215463
11	Mateo Herrera	17254102	mherrea@gmail.com	Quito	0995241314
12	invalid	9999999999	correo@correo	invalid	99999999
13	Camila Rosanda	174545463	cr@gmail.com	Quito	919891895
46	invalid	9999999999	correo@correo	invalid	99999999
\.


--
-- TOC entry 3345 (class 0 OID 16395)
-- Dependencies: 212
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (plato_id, plato_nombre, plato_precio, plato_descripcion, plato_disponibilidad, plato_imagen, plato_categoria) FROM stdin;
7	Helado	1.50	Cono de helado simple	t	https://insanelygoodrecipes.com/wp-content/uploads/2023/08/Different_Ice_Cream_Flavors_in_Cones.jpg	Postres
1	Hamburguesa	2.50	Hamburguesa de res con vegetales y salsas	f	https://media.istockphoto.com/id/1309352410/es/foto/hamburguesa-con-queso-con-tomate-y-lechuga-en-tabla-de-madera.jpg?s=612x612&w=0&k=20&c=HaSLXFFns4_IHfbvWY7_FX7tlccVjl0s0BrlqaLHOTE=	\N
3	Espresso	1.75	Shot de espresso	t	https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Espresso-Macchiato-by-Nespresso.jpg	Cafetería
8	Lasaña	5	De carne o de pollo servido con ensalada	t	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp4zTO5sA-BJV9jbPxfsaxoGsvp3q6VxqhhrVILelDNQ&s	Platos
11	Parrillada	7	Parrillada individual	t	https://images.getduna.com/778638be-f075-4711-95b8-85f4526db8ec/a14c06157f531732_domicilio_34723_744x744_1626836890_1700665922.png?d=300x300&format=webp	Platos
2	Pizza	1	Pizza individual	t	https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg	Platos
6	Latte	1	Cafe latte recien hecho	f	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkw2p86cVXGMrrt5enhn7LjxnkE_J5XmympADYXbxxg&s	Cafetería
4	Milkshake	3	Batido de helado con leche servido con crema y decoraciones	t	https://bakingmischief.com/wp-content/uploads/2022/03/milkshake-recipes-square.jpg	Bebidas
5	Higos con queso	3	Porcion del tradicional postre	t	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb9NcqhKNFY8xeDRuNSrpNQO77WHUQHpd9XjpQvMc1LA&s	Postres
12	Gaseosas	1.5	Vaso de gaseosa	t	https://images.newscientist.com/wp-content/uploads/2022/10/19100521/SEI_121043303.jpg	Bebidas
13	Hot Dog	1.5	Hot dog de carne o pollo con salsas	t	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0YMS42ZdieJMkszlE9MhFOFwWQ35sX3EdGuKuBOcxw&s	Platos
14	Fanesca	4.5	Plato de tradicional fanesca con sus guarniciones 	t	https://www.lahora.com.ec/wp-content/uploads/2023/03/plato-fanesca-economia-tradicion-ecuador.jpg	Platos
10	Jugo	1	Vaso de jugo fresco varios sabores	t	https://laroussecocina.mx/wp-content/uploads/2017/11/curiosidades-jugos.jpg.webp	Bebidas
\.


--
-- TOC entry 3348 (class 0 OID 16412)
-- Dependencies: 215
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orden (orden_id, orden_precio, orden_preciofinal, orden_cliente, orden_fecha, orden_iva) FROM stdin;
1	2.95	2.95	2	\N	\N
3	0.00	0.00	2	2002-02-02	0
4	0.00	0.00	2	2002-02-02	0
5	0.00	0.00	1	2002-06-06	0
6	0.00	0.00	1	2002-06-06	0
7	0.00	0.00	1	2002-06-06	0
8	0.00	0.00	1	2002-06-06	0
9	0.00	0.00	1	2002-06-06	0
10	0.00	0.00	1	2002-06-06	0
11	0.00	0.00	1	2002-06-06	0
12	12	13.8	9	2024-04-12	2
14	13	14.95	11	2024-04-13	1.95
13	5	5.75	11	2024-04-13	0.75
15	15	17.25	12	2024-04-13	2.25
16	0	0	13	2024-04-13	0
49	15.5	17.825	46	2024-04-15	2.3249999999999997
\.


--
-- TOC entry 3346 (class 0 OID 16403)
-- Dependencies: 213
-- Data for Name: pedido_detalle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido_detalle (detalle_platos, detalle_id, "detalle_ordenID", detalle_cantidad) FROM stdin;
5	2	1	3
\N	3	\N	\N
\N	4	\N	\N
8	5	12	1
11	6	12	1
2	7	13	1
10	8	13	1
7	9	13	2
8	10	14	1
10	11	14	2
5	12	14	2
10	13	15	2
5	14	15	1
8	15	15	2
8	16	16	1
10	17	16	2
7	18	16	2
2	49	49	1
11	50	49	1
12	51	49	2
10	52	49	1
7	53	49	3
\.


--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 209
-- Name: Cliente_cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cliente_cliente_id_seq"', 46, true);


--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 211
-- Name: menu_plato_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_plato_id_seq', 14, true);


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 214
-- Name: orden_orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orden_orden_id_seq', 49, true);


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 216
-- Name: pedido_detalle_detalle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_detalle_detalle_id_seq', 53, true);


--
-- TOC entry 3192 (class 2606 OID 16393)
-- Name: cliente Cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY (cliente_id);


--
-- TOC entry 3194 (class 2606 OID 32784)
-- Name: menu menu_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pk PRIMARY KEY (plato_id);


--
-- TOC entry 3199 (class 2606 OID 16417)
-- Name: orden orden_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pk PRIMARY KEY (orden_id);


--
-- TOC entry 3197 (class 2606 OID 16429)
-- Name: pedido_detalle pedido_detalle_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_detalle
    ADD CONSTRAINT pedido_detalle_pk PRIMARY KEY (detalle_id);


--
-- TOC entry 3195 (class 1259 OID 49157)
-- Name: fki_detalle_ordenID; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_detalle_ordenID" ON public.pedido_detalle USING btree ("detalle_ordenID");


--
-- TOC entry 3201 (class 2606 OID 49152)
-- Name: pedido_detalle detalle_ordenID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_detalle
    ADD CONSTRAINT "detalle_ordenID" FOREIGN KEY ("detalle_ordenID") REFERENCES public.orden(orden_id);


--
-- TOC entry 3202 (class 2606 OID 16418)
-- Name: orden orden_cliente_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_cliente_fk FOREIGN KEY (orden_cliente) REFERENCES public.cliente(cliente_id);


--
-- TOC entry 3200 (class 2606 OID 32785)
-- Name: pedido_detalle pedido_detalle_menu_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido_detalle
    ADD CONSTRAINT pedido_detalle_menu_fk FOREIGN KEY (detalle_platos) REFERENCES public.menu(plato_id);


-- Completed on 2024-04-26 01:20:18 UTC

--
-- PostgreSQL database dump complete
--
