CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_payments_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_payments_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    phone character varying(15) NOT NULL,
    amount numeric(10,2) NOT NULL,
    bundle_name character varying(255) NOT NULL,
    transaction_id character varying(100),
    checkout_request_id character varying(100),
    status character varying(50) DEFAULT 'pending'::character varying NOT NULL,
    mpesa_receipt_number character varying(100),
    result_code character varying(10),
    result_desc text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: idx_payments_checkout_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_checkout_request_id ON public.payments USING btree (checkout_request_id);


--
-- Name: idx_payments_phone; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_phone ON public.payments USING btree (phone);


--
-- Name: idx_payments_transaction_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_transaction_id ON public.payments USING btree (transaction_id);


--
-- Name: payments update_payments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_payments_updated_at();


--
-- Name: payments Anyone can create payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create payments" ON public.payments FOR INSERT WITH CHECK (true);


--
-- Name: payments Anyone can read payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can read payments" ON public.payments FOR SELECT USING (true);


--
-- Name: payments Anyone can update payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update payments" ON public.payments FOR UPDATE USING (true);


--
-- Name: payments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


