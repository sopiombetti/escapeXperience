package com.example.PIequipo1.security;


/*import com.example.PIequipo1.security.jwt.JwtRequestFilter;*/
import com.example.PIequipo1.security.jwt.JwtRequestFilter;
import com.example.PIequipo1.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration//anotacion de configuracion
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

   @Autowired
   private UsuarioService usuarioService;

   @Autowired
   private JwtRequestFilter jwtRequestFilter;

   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usuarioService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                //Configurar end points que se van a proteger o no se van a proteger
                .authorizeRequests()
                    //End points que no van a tener proteccion
                    .antMatchers(
                            "/login",
                            "/cerrarSesion",
                            "/aventuras",
                            "/aventuras/*",
                            "/aventuras/por-fecha/*",
                            "/aventuras/*/*",
                            "/caracteristicas",
                            "/caracteristicas/*",
                            "/politicas",
                            "/politicas/*",
                            "/mail",
                            "/mail/*",
                            "/mail/*/*",
                            "/puntuacion",
                            "/puntuacion/*",
                            "/puntuacion/*/*",
                            "/usuario/registrar",
                            "/usuario/validar/*",
                            "/categorias",
                            "/reserva/listar"



                    ).permitAll()

                    //End points con autenticacion y asignacion de rol
                    .antMatchers("/accesUser" ,
                            "/reserva",
                            "/reserva/*",
                            "/reserva/*/*")
                       .hasAnyAuthority("USER", "ADMIN","SUPERADMIN")

                    .antMatchers("/accesAdmin",
                            "/usuario",
                            "/usuario/*",
                            "/usuario/*/*",
                            "/caracteristicas/*/*",
                            "/politicas/*/*",
                            "/categorias/*",
                            "/categorias/*/*"
                    )
                    .hasAnyAuthority("ADMIN","SUPERADMIN")

                    .antMatchers("/accesSuperAdmin",
                            "/atribucion",
                            "/atribucion/*",
                            "/atribucion/*/*",
                            "/rol",
                            "/rol/*",
                            "/rol/*/*"
                    )
                    .hasAnyAuthority("SUPERADMIN")

                    .anyRequest().authenticated()

                    .and()

                //configuracion del comportamiento de sesiones
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                //En caso que no se autentique o se genere un error lo regresa al login
                // .invalidSessionUrl("/login")
                //Cantidad maxima de sesiones abiertas al tiempo
                .maximumSessions(1)
                //Cuando expira la autenticacion se regresa al usuario al formulario login
                // .expiredUrl("/login")
                .and();
                //Proteccion de vulnerabilidad se genera nueva sesion al detectar ataque de fijacion de sesion
                //.sessionFixation()
                //.newSession()
                //   .and();
        http.cors();
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}